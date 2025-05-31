// Theme toggle functionality
function setupThemeToggle() {
  const themeToggle = document.getElementById("theme-toggle")
  const themeSwitcher = document.querySelector(".theme-switcher")
  const body = document.body

  if (!themeToggle || !themeSwitcher) {
    console.warn("Theme toggle elements not found")
    return
  }

  // Check system preference
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

  // Check for saved theme preference or use system preference
  const currentTheme = localStorage.getItem("theme") || (prefersDark ? "dark" : "light")

  if (currentTheme === "dark") {
    body.setAttribute("data-theme", "dark")
    themeSwitcher.classList.add("dark")
    themeToggle.checked = true
  } else {
    body.setAttribute("data-theme", "light")
    themeSwitcher.classList.remove("dark")
    themeToggle.checked = false
  }

  // Listen for system theme changes
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
    if (!localStorage.getItem("theme")) {
      const newTheme = e.matches ? "dark" : "light"
      body.setAttribute("data-theme", newTheme)
      themeSwitcher.classList.toggle("dark", e.matches)
      themeToggle.checked = e.matches
    }
  })

  themeToggle.addEventListener("change", function () {
    if (this.checked) {
      body.setAttribute("data-theme", "dark")
      themeSwitcher.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      body.setAttribute("data-theme", "light")
      themeSwitcher.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }
  })
}

// Minecraft MOTD parsing functions
function parseMOTD(input) {
  const colorMap = {
    "§0": "mc-black",
    "§1": "mc-dark-blue",
    "§2": "mc-dark-green",
    "§3": "mc-dark-aqua",
    "§4": "mc-dark-red",
    "§5": "mc-dark-purple",
    "§6": "mc-gold",
    "§7": "mc-gray",
    "§8": "mc-dark-gray",
    "§9": "mc-blue",
    "§a": "mc-green",
    "§b": "mc-aqua",
    "§c": "mc-red",
    "§d": "mc-light-purple",
    "§e": "mc-yellow",
    "§f": "mc-white",
  }

  const formatMap = {
    "§l": "mc-bold",
    "§m": "mc-strikethrough",
    "§n": "mc-underline",
    "§o": "mc-italic",
  }

  let result = ""
  let currentSpan = ""
  let currentClasses = []

  for (let i = 0; i < input.length; i++) {
    if (input[i] === "§" && i + 1 < input.length) {
      if (currentSpan) {
        result += `<span class="${currentClasses.join(" ")}">${currentSpan}</span>`
        currentSpan = ""
      }

      const code = input.substr(i, 2)
      if (colorMap[code]) {
        currentClasses = [colorMap[code]]
      } else if (formatMap[code]) {
        currentClasses.push(formatMap[code])
      } else if (code === "§r") {
        currentClasses = []
      }
      i++
    } else {
      currentSpan += input[i]
    }
  }

  if (currentSpan) {
    result += `<span class="${currentClasses.join(" ")}">${currentSpan}</span>`
  }

  return result || "No description available"
}

function removeColorCodes(text) {
  return text.replace(/§[0-9a-fklmnor]/gi, "")
}

// Auto-initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  setupThemeToggle()
})

// Also setup immediately if DOM is already loaded
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", setupThemeToggle)
} else {
  setupThemeToggle()
}

// Export functions for use in other scripts
window.parseMOTD = parseMOTD
window.removeColorCodes = removeColorCodes
window.setupThemeToggle = setupThemeToggle
