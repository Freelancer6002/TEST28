"use strict"

let [canvas, button] = [document.querySelector("canvas"), document.querySelectorAll(".button")],
   ctx = canvas.getContext("2d"),
   [width, height] = [document.documentElement.clientWidth, document.documentElement.clientHeight],
   [canvasWidth, canvasHeight] = [width / 1.1, height / 1.2],
   leftPressed, rightPressed, jumpPressed = false,
   jumpCount = null, jumpHeight = null,
   gravity = height / 8, power = 4,
   [playerHeight, playerWidth] = [height / 6.25, height / 6.25],
   [playerX, playerY] = [(canvasWidth - playerHeight) / 2, canvasHeight - playerHeight]
   
canvas.width = canvasWidth; canvas.height = canvasHeight
window.addEventListener("resize", () => location.reload())
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) MB(); else PK()

setInterval(() => {
   ctx.clearRect(0, 0, canvasWidth, canvasHeight)
   if (rightPressed && playerX < canvas.width - playerWidth) playerX += 7
   if (leftPressed && playerX > 0) playerX -= 7
   if (jumpPressed) { jumpCount++; jumpHeight = power * gravity * Math.sin(Math.PI * jumpCount / gravity) }
   if (jumpCount > gravity) { jumpCount = null; jumpHeight = null; jumpPressed = false }
   ctx.beginPath()
   ctx.rect(playerX, playerY - jumpHeight, playerWidth, playerHeight)
   ctx.fillStyle = "blue"
   ctx.fill()
   ctx.closePath()
}, height / -60 + 21)

function PK() {
   document.addEventListener("keydown", e => {
      if (["ArrowRight", "KeyD", "Numpad6"].includes(e.code)) rightPressed = true
      if (["ArrowLeft", "KeyA", "Numpad4"].includes(e.code)) leftPressed = true
      if (["ArrowUp", "Space", "KeyW", "Numpad8"].includes(e.code)) jumpPressed = true
   }, false)
   document.addEventListener("keyup", e => {
      if (["ArrowRight", "KeyD", "Numpad6"].includes(e.code)) rightPressed = false
      if (["ArrowLeft", "KeyA", "Numpad4"].includes(e.code)) leftPressed = false
   }, false)
}

function MB() {
   if (window.orientation == 0) alert("Переверните устройство на 90°"); else {
      document.querySelector(".wrapper").style.display = "block"
      button[1].addEventListener("touchstart", () => leftPressed = true)
      button[2].addEventListener("touchstart", () => rightPressed = true)
      button[0].addEventListener("touchstart", () => jumpPressed = true)
      button[1].addEventListener("touchend", () => leftPressed = false)
      button[2].addEventListener("touchend", () => rightPressed = false)
   }
}