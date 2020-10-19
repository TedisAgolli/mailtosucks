import $ from "jquery";
import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";

window.onload = () => {
  const copyURI = (evt) => {
    evt.preventDefault();

    navigator.clipboard.writeText(evt.target.text).then(
      () => {
        evt.target._tippy.show();
        /* clipboard successfully set */
      },
      () => {
        /* clipboard write failed */
      }
    );
  };
  const extractEmails = (text) => {
    text = text.split("mailto:")[1];
    const regexRes = text.match(
      /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi
    );
    const decodedRes = decodeURIComponent(text).split("?")[0];
    return regexRes ? regexRes : decodedRes;
  };

  let links = $("a[href^='mailto:']");
  links.each((idx, link) => {
    let email = extractEmails(link.href);
    if (email) {
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
      link.text = email;
      link.title = "Click to copy to clipboard";
      link.addEventListener("click", copyURI);
    } else {
      link.title = "Email could not be parsed";
    }
  });
};
