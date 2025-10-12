import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Brand */}
          <div className={styles.brand}>
            <div className={styles.brandHeader}>
              <span className={styles.brandName}>Modyon</span>
            </div>
            <p className={styles.brandText}>
              Join our giveaways and win amazing prizes. Be part of the hype.
            </p>
            <Link href="#form" className={styles.ctaButton}>
              Join Now
            </Link>
          </div>

          {/* Contact */}
          <div className={styles.contact}>
            <h3 className={styles.contactHeading}>Contact</h3>
            <ul className={styles.contactList}>
              <li>
                <a href="mailto:tareksibachir01@gmail.com" className={styles.contactLink}>
                  <svg
                    className={styles.icon}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  tareksibachir01@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:+213659742771" className={styles.contactLink}>
                  <svg
                    className={styles.icon}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  +213 659742771
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={styles.bottomBar}>
          <p>© {new Date().getFullYear()} Modyon. All rights reserved.</p>
          <p>Built with ❤️ by the Modyon Team</p>
        </div>
      </div>
    </footer>
  );
}
