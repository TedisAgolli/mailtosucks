import $ from "jquery";
import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";

window.onload = () => {
  const copyURI = (evt) => {
    evt.preventDefault();

    navigator.clipboard.writeText(evt.target.text).then(
      () => {
        evt.target._tippy.show();
        console.log(evt.target);
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

  let links = $("a[href^='mailto:']");
  links.each((idx, link) => {
    tippy(link, {
      content: "Email copied to clipboard",
      trigger: "manual",
      placement: "top",
      arrow: true,
      onShow(instance) {
        setTimeout(() => {
          instance.hide();
        }, 2000);
      },
    });
    let email = extractEmails(link.href);
    link.text = email;
    link.addEventListener("click", copyURI);
  });
};
