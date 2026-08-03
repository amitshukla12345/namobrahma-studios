import glob
import os

html_files = glob.glob('*.html')

menu_html = """
    <!-- Mobile Menu Toggle -->
    <div class="hamburger-menu" id="hamburger-menu">
      <span></span>
      <span></span>
      <span></span>
    </div>
  </nav>

  <!-- Full-Screen Mobile Menu -->
  <div class="mobile-menu-overlay" id="mobile-menu">
    <div class="mobile-menu-close" id="mobile-menu-close">&times;</div>
    <div class="mobile-menu-links">
      <a href="index.html">HOME</a>
      <a href="about.html">ABOUT</a>
      <a href="work.html">WORK</a>
      <a href="capability.html">CAPABILITY</a>
      <a href="lab.html">LAB</a>
      <a href="contact.html">CONTACT</a>
      <a href="contact.html" class="btn-primary black-btn" style="margin-top: 2rem;">LET'S TALK &rarr;</a>
    </div>
  </div>
"""

for file in html_files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if 'id="hamburger-menu"' not in content:
        content = content.replace('  </nav>', menu_html)
        
        with open(file, 'w', encoding='utf-8') as f:
            f.write(content)
            print(f"Updated {file}")
