window.onload = () => {
  console.log("HEY");
  const copyURI = (evt) => {
    evt.preventDefault();
    console.log(evt);
    navigator.clipboard.writeText(evt.target.text).then(
      () => {
        tlite.show(evt.target, { grav: "s" });
        /* clipboard successfully set */
      },
      () => {
        /* clipboard write failed */
      }
    );
  };
  const extractEmails = (text) => {
    return text.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
  };

  let links = jQuery("a[href^='mailto:']");
  links.each((idx, link) => {
    let email = extractEmails(link.href);
    link.text = email;
    link.title = "copied";
    link.addEventListener("click", copyURI);
    console.log(email);
  });
};
