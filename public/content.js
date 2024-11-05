// content.js
document.addEventListener("mouseup", () => {
  const selectedText = window.getSelection().toString();
  if (selectedText.length > 0) {
    // Show your icon here (you could create an icon element and style it)
    const icon = document.createElement('div');
    icon.innerHTML = './icon.png'; // Use an icon or image here
    icon.style.position = 'absolute';
    icon.style.zIndex = '1000';
    icon.style.background = 'white';
    icon.style.padding = '5px';
    icon.style.borderRadius = '5px';
    icon.style.top = `${event.clientY + window.scrollY}px`;
    icon.style.left = `${event.clientX + window.scrollX}px`;
    document.body.appendChild(icon);
    
    // Remove the icon after a few seconds
    setTimeout(() => {
      document.body.removeChild(icon);
    }, 2000);
  }
});
