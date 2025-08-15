export function MembersHeader() {
  return (
    <div
      className="relative flex items-center justify-between overflow-hidden rounded-lg bg-neutral05 bg-cover bg-center bg-no-repeat p-6"
      style={{
        backgroundImage: "url('/members_header.svg')",
      }}
    >
      <div className="relative z-10 flex items-center gap-6">
        <div>
          <h1 className="text-3xl font-bold text-neutral90">Team Management</h1>
          <p className="mt-2 max-w-2xl text-neutral80">
            Create teams and manage team memberships
          </p>
        </div>
      </div>
    </div>
  );
}
