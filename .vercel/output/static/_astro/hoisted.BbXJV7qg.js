import"./hoisted.C_1nCmMS.js";document.querySelectorAll(".bg-white.rounded-lg button").forEach(e=>{e.addEventListener("click",()=>{const t=e.nextElementSibling,n=e.querySelector(".text-gray-400");t.classList.toggle("hidden"),n.style.transform=t.classList.contains("hidden")?"rotate(0deg)":"rotate(180deg)"})});const o=document.querySelector('input[type="text"]');o?.addEventListener("keyup",e=>{console.log("Searching for:",e.target.value)});