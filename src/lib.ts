export function renderBlock(elementId: string, html: string) {
  const element = document.getElementById(elementId);
  if (element) {
    element.innerHTML = html;
  }
}

export type Action = {
  name: string;
  messageText: string | null;
  handler: () => void;
};

export function renderToast(
  message: { type: string; text: string } | null,
  action: Action | undefined = undefined
) {
  const messageText = "";

  if (message != null && action != null) {
    action.messageText = `
      <div id="info-block" class="info-block ${message.type}">
        <p>${message.text}</p>
        <button id="toast-main-action">${action?.name || "Закрыть"}</button>
      </div>
    `;
  }

  renderBlock("toast-block", messageText);

  const button = document.getElementById("toast-main-action");
  if (button != null) {
    button.onclick = function () {
      if (action != null && action.handler != null) {
        action.handler();
      }
      renderToast(null);
    };
  }
}
