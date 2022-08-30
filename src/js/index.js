//projects buttons
function switchPage(buttonClick) {
    switch (buttonClick) {
        case '1': 
            document.getElementById("batteryLog").style.display='block'
            document.getElementById("batteryMonitoring").style.display='none'
            document.getElementById("discordBots").style.display='none'
            document.getElementById("fireworks").style.display='none'
            document.getElementById("project-batteryLog").className = "project-button project-button-selected"
            document.getElementById("project-batteryMonitoring").className = "project-button project-button-deselected"
            document.getElementById("project-discordBots").className = "project-button project-button-deselected"
            document.getElementById("project-fireworks").className = "project-button project-button-deselected"
            break;
        case '2':
            document.getElementById("batteryLog").style.display='none'
            document.getElementById("batteryMonitoring").style.display='block'
            document.getElementById("discordBots").style.display='none'
            document.getElementById("fireworks").style.display='none'
            document.getElementById("project-batteryLog").className = "project-button project-button-deselected"
            document.getElementById("project-batteryMonitoring").className = "project-button project-button-selected"
            document.getElementById("project-discordBots").className = "project-button project-button-deselected"
            document.getElementById("project-fireworks").className = "project-button project-button-deselected"
            break;
        case '3':
            document.getElementById("batteryLog").style.display='none'
            document.getElementById("batteryMonitoring").style.display='none'
            document.getElementById("discordBots").style.display='block'
            document.getElementById("fireworks").style.display='none'
            document.getElementById("project-batteryLog").className = "project-button project-button-deselected"
            document.getElementById("project-batteryMonitoring").className = "project-button project-button-deselected"
            document.getElementById("project-discordBots").className = "project-button project-button-selected"
            document.getElementById("project-fireworks").className = "project-button project-button-deselected"
            break;
        case '4':
            document.getElementById("batteryLog").style.display='none'
            document.getElementById("batteryMonitoring").style.display='none'
            document.getElementById("discordBots").style.display='none'
            document.getElementById("fireworks").style.display='block'
            document.getElementById("project-batteryLog").className = "project-button project-button-deselected"
            document.getElementById("project-batteryMonitoring").className = "project-button project-button-deselected"
            document.getElementById("project-discordBots").className = "project-button project-button-deselected"
            document.getElementById("project-fireworks").className = "project-button project-button-selected"
            break;
    }
}