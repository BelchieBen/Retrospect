import { Button } from "~/components/ui/button";
import { CreateBoard } from "~/app/_components/create-board";
import { IFileText, IPlus } from "~/icons";
import HelixPalette from "~/styles/palette";

export function TemplatesHeader() {
  return (
    <div
      className="relative flex items-center justify-between overflow-hidden rounded-lg bg-cover bg-center bg-no-repeat p-6"
      style={{
        backgroundImage: "url('/our_company.svg')",
      }}
    >
      <div className="relative z-10 flex items-center gap-6">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <IFileText color={HelixPalette.neutral90} size={24} />
            <span className="text-sm font-medium text-neutral80">
              Board Templates
            </span>
          </div>
          <h1 className="text-3xl font-bold text-neutral90">
            Choose a template to get started
          </h1>
          <p className="mt-2 max-w-2xl text-neutral80">
            Get up and running quickly with our professionally designed board
            templates. Perfect for teams, projects, and personal organization.
          </p>
        </div>
      </div>
      <div className="relative z-10 flex gap-3">
        <CreateBoard>
          <Button className="bg-teal60 text-white shadow-lg hover:bg-teal70">
            <IPlus color={HelixPalette.white} />
            Create blank board
          </Button>
        </CreateBoard>
      </div>
    </div>
  );
}
