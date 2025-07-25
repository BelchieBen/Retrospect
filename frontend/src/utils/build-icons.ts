import { JSDOM } from "jsdom";
import path from "path";
import fse from "fs-extra";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename);

// Variables.
const srcFolder = path.resolve(__dirname, "../../public/icons");
const destFolder = path.resolve(
  __dirname,
  "../src/components/Iconography/Icons",
);

const iconTemplateFile = path.resolve(__dirname, "./Icon.txt");

// The files names to add to the index.ts.
const indexNames: string[] = [];

/**
 * Recursive function to parse an svg.
 * @param HTMLElelent The element to parse.
 */
const parseElement = (ele: Element) => {
  // Remove fill.
  ele.removeAttribute("fill");

  // clip-path
  if (ele.hasAttribute("clip-path")) {
    const cpValue = ele.getAttribute("clip-path");
    if (cpValue) {
      ele.removeAttribute("clip-path");
      ele.setAttribute("clipPath", cpValue);
    }
  }

  // clip-rule
  if (ele.hasAttribute("clip-rule")) {
    const crValue = ele.getAttribute("clip-rule");
    if (crValue) {
      ele.removeAttribute("clip-rule");
      ele.setAttribute("clipRule", crValue);
    }
  }

  // fill-rule
  if (ele.hasAttribute("fill-rule")) {
    const frValue = ele.getAttribute("fill-rule");
    if (frValue) {
      ele.removeAttribute("fill-rule");
      ele.setAttribute("fillRule", frValue);
    }
  }

  // Parse any children.
  if (Array.from(ele.children).length > 0) {
    Array.from(ele.children).forEach((c) => parseElement(c));
  }
};

/**
 * Extract or create a normalized viewBox
 */
const getViewBox = (svgElement: Element): string => {
  // Check if viewBox already exists
  const existingViewBox = svgElement.getAttribute("viewBox");
  if (existingViewBox) {
    return existingViewBox;
  }

  // Try to get width and height attributes
  const width = svgElement.getAttribute("width");
  const height = svgElement.getAttribute("height");

  if (width && height) {
    // Remove any non-numeric characters (like 'px', 'em', etc.)
    const cleanWidth = parseFloat(width.replace(/[^0-9.]/g, ""));
    const cleanHeight = parseFloat(height.replace(/[^0-9.]/g, ""));

    if (!isNaN(cleanWidth) && !isNaN(cleanHeight)) {
      return `0 0 ${cleanWidth} ${cleanHeight}`;
    }
  }

  // Default fallback - most icons are designed for 24x24
  return "0 0 24 24";
};

/**
 * Builds an icon file.
 */
const buildIconFile = async (name: string) => {
  // Generate name.
  const nameNoExt = name.substring(0, name.length - 4);
  const nameParts = nameNoExt.split("-");
  const parsedName = nameParts
    .map((p) => `${p.charAt(0).toUpperCase()}${p.slice(1)}`)
    .join("");

  // Read the svg and extract the path d attr.
  const svg = fse.readFileSync(`${srcFolder}/${name}`, "utf-8");
  const dom = new JSDOM(`<!DOCTYPE html>${svg}`);
  const svgEle = dom.window.document.querySelector("svg");

  if (svgEle) {
    const children = Array.from(svgEle.children);

    if (children.length > 0) {
      // Parse each element.
      children.forEach((c) => parseElement(c));

      // Get or create viewBox
      const viewBox = getViewBox(svgEle);

      // Read the template.
      let template = fse.readFileSync(iconTemplateFile, "utf-8");

      // Replace {{NAME}}, {{VIEWBOX}}, and {{PATHS}} placeholders.
      template = template.replace(/{{NAME}}/g, parsedName);
      template = template.replace("{{VIEWBOX}}", viewBox);
      template = template.replace(
        "{{PATHS}}",
        children.map((c) => c.outerHTML).join("\n"),
      );

      // Write the new tsx file to the dest directory.
      fse.writeFileSync(`${destFolder}/${parsedName}.tsx`, template, {
        flag: "w",
      });

      console.log(`> Created: ${parsedName} (viewBox: ${viewBox})`);

      indexNames.push(parsedName);
    }
  }
};

/**
 * Main build function
 */
const buildIcons = async () => {
  // Pre build tasks.
  if (fse.existsSync(destFolder)) {
    console.log("> Clearing icons directory");
    fse.rmSync(destFolder, { recursive: true, force: true });
  }

  console.log("> Creating icons directory");
  fse.mkdirSync(destFolder, { recursive: true });

  console.log(`> Checking source icons at ${srcFolder}`);

  // Make sure the src directory exists.
  if (fse.existsSync(srcFolder)) {
    const files = await fse.readdir(srcFolder);

    // If there are no icons in the src directory.
    if (files.length <= 0) {
      console.error("> Build failed: 0 icons found");
      return;
    }

    console.log(`> ${files.length} icon(s) found`);

    // Build icons - Use for...of loop to properly handle async
    for (const file of files) {
      await buildIconFile(file);
    }

    // Build index file.
    if (indexNames.length > 0) {
      console.log("\n> Creating index.ts\n");
      fse.writeFileSync(
        `${destFolder}/index.ts`,
        indexNames.map((n) => `export * from './${n}';`).join("\n"),
        { flag: "w" },
      );
    }

    // Build complete.
    console.log("> Build Complete\n");
  } else {
    console.error("> Build failed: Source icon directory not found");
  }
};

// Execute the build function
buildIcons().catch((error) => {
  console.error("Build failed:", error);
  process.exit(1);
});
