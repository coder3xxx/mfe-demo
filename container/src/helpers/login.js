export const crossLoginToSubApp = (data) => {
  // Cross data to sub-app
  const loginEvent = new CustomEvent('AUTHORIZATION_TO_SUB_APP', { detail: data });

  window.dispatchEvent(loginEvent);
}