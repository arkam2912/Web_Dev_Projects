// Toggle menu
const iconToggle = document.querySelector(".toggle_icon");
const navbarMenu = document.querySelector(".menu");
const menuLinks = document.querySelectorAll(".menu_link");
const iconClose = document.querySelector(".close_icon");

iconToggle.addEventListener('click', () => {
  navbarMenu.classList.toggle('active');
});
iconClose.addEventListener('click', () => {
  navbarMenu.classList.remove('active');
});
menuLinks.forEach((menuLink) => {
  menuLink.addEventListener('click', () => {
    navbarMenu.classList.remove('active');
  });
});

// Combined scroll event handler
function handleScroll() {
  const header = document.getElementById('header');
  const sections = document.querySelectorAll('section');
  const currentScroll = window.scrollY + header.offsetHeight; 
  header.classList.toggle('active', window.scrollY >= 20);

  // Update active menu item
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    const sectionId = section.getAttribute('id');
    const correspondingMenuItem = document.querySelector(`a[href="#${sectionId}"]`);

    if (currentScroll >= sectionTop && currentScroll < sectionTop + sectionHeight) {
      document.querySelectorAll('.menu_link').forEach((item) => {
        item.classList.remove('active_link');
      });
      correspondingMenuItem.classList.add('active_link');
    }
  });
}

window.addEventListener('scroll', handleScroll);

// Typed effect initialization
const typed = document.querySelector('.typed');
if (typed) {
  let typed_strings = typed.getAttribute('data-typed-items');
  typed_strings = typed_strings.split(',');
  new Typed('.typed', {
    strings: typed_strings,
    loop: true,
    typeSpeed: 100,
    backSpeed: 50,
    backDelay: 2000
  });
}

// Smooth scroll to section when menu item is clicked
menuLinks.forEach(link => {
  link.addEventListener('click', function(event) {
    event.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);

    window.scrollTo({
      top: targetSection.offsetTop - header.offsetHeight,
      behavior: 'smooth'
    });
  });
});

// Send email function
function sendMail(event) {
  event.preventDefault();

  const btn = document.getElementById('button');
  btn.innerHTML = 'Sending...';

  const serviceID = EMAILJS_SERVICE_ID;
  const templateID = EMAILJS_TEMPLATE_ID;

  const name = document.getElementById('name').value;
  const email = document.getElementById('email_id').value;
  const message = document.getElementById('message').value;

  const templateParams = {
    name: name,
    email: email,
    message: message
  };

  emailjs.send(serviceID, templateID, templateParams)
    .then(() => {
      btn.innerHTML = 'Send Mail';
      alert('Email sent successfully!');
    }, (err) => {
      btn.innerHTML = 'Send Mail';
      alert('Error sending email:', JSON.stringify(err));
    });
}
