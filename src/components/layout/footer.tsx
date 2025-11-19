import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-primary-500/10 bg-dark-950">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold text-gradient font-[family-name:var(--font-orbitron)] mb-4">
              PuzzleBrand
            </h3>
            <p className="text-dark-400 text-sm">
              Solve puzzles, answer questions, and compete daily for cash
              prizes. The ultimate gaming platform for brands.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-dark-100 mb-4">For Players</h4>
            <ul className="space-y-2 text-sm text-dark-400">
              <li>
                <Link
                  href="/campaigns"
                  className="hover:text-primary-500 transition-colors">
                  Browse Puzzles
                </Link>
              </li>
              <li>
                <Link
                  href="/leaderboard"
                  className="hover:text-primary-500 transition-colors">
                  Leaderboard
                </Link>
              </li>
              <li>
                <Link
                  href="/how-it-works"
                  className="hover:text-primary-500 transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link
                  href="/prizes"
                  className="hover:text-primary-500 transition-colors">
                  Daily Prizes
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-dark-100 mb-4">For Brands</h4>
            <ul className="space-y-2 text-sm text-dark-400">
              <li>
                <Link
                  href="/brand"
                  className="hover:text-primary-500 transition-colors">
                  Create Campaign
                </Link>
              </li>
              <li>
                <Link
                  href="/brand/pricing"
                  className="hover:text-primary-500 transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="/brand/case-studies"
                  className="hover:text-primary-500 transition-colors">
                  Case Studies
                </Link>
              </li>
              <li>
                <Link
                  href="/brand/analytics"
                  className="hover:text-primary-500 transition-colors">
                  Analytics
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-dark-100 mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-dark-400">
              <li>
                <Link
                  href="/help"
                  className="hover:text-primary-500 transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-primary-500 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="hover:text-primary-500 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="hover:text-primary-500 transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-500/10 pt-8 mt-8 text-center text-sm text-dark-500">
          <p>&copy; 2024 PuzzleBrand. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
