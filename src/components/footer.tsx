import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col items-center justify-between space-y-4 sm:flex-row sm:space-y-0">
          <div className="text-sm text-muted-foreground">
            made with <span aria-label="love">♥️</span> by{" "}
            <Link
              href="https://adiadd.xyz"
              className="text-muted-foreground hover:text-primary"
              aria-label="aditya"
              target="_blank"
              rel="noopener noreferrer"
            >
              aditya
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              href="https://twitter.com/agnilabs"
              className="text-muted-foreground hover:text-primary"
              aria-label="twitter/x"
              target="_blank"
              rel="noopener noreferrer"
            >
              twitter/x
              <span className="sr-only">twitter/x</span>
            </Link>
            <Link
              href="https://github.com/agnilabs"
              className="text-muted-foreground hover:text-primary"
              aria-label="github"
              target="_blank"
              rel="noopener noreferrer"
            >
              github
              <span className="sr-only">github</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
