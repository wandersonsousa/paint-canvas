(()=>{
    const $ = sel => document.querySelector(sel)
    const $$ = sel => document.querySelector(sel)

    function drawLineInScreen(evt){
        context.beginPath()
        if(lastX && lastY){
            context.moveTo(lastX, lastY)
        }else{
            context.moveTo(evt.clientX, evt.clientY )
        }
        context.lineJoin = 'round'
        context.lineCap = 'round'
        context.strokeStyle = lineConfig.color
        context.lineWidth = lineConfig.lineWidth
        context.lineTo(evt.clientX, evt.clientY )
        context.stroke()
        lastX = evt.clientX
        lastY = evt.clientY
    }
    function draw( evt ){
        evt.preventDefault()
        if(drawing){
            if(aleatoryColorMode && !eraserMode){
                lineConfig.color = `hsl(${hue}, 100%, 50%)`
                hue += 1
            }else if(!eraserMode){
                lineConfig.color = $colorInput.value
            }else{
                lineConfig.color = lineConfig.color
            }
            animationFrame( () => drawLineInScreen(evt) )
        }
    }
    function drawLeave(evt){
        evt.preventDefault()
        drawing = false
    }
    function initDraw(evt){
        evt.preventDefault()
        drawing = true
        lastX = lastY = null
    }  


    
    let $colorInput = $('#color-input')
    let $alColorCheck = $('#al-color')
    let $widthLine = $('#widthline-range')
    let $allClearBtn = $('#clearAll')
    let $eraserCheck = $('#eraser-check')

    let aleatoryColorMode = false
    let drawing = false
    let handleColorNow = false
    let hue = 45
    let eraserMode = false
    let lastX = 0
    let lastY = 0

    const paintArea = $('#paintArea')
    const context = paintArea.getContext('2d')

    const lineConfig = {
        color:$colorInput.value,
        lastX:0,
        lastY:0,
        lineWidth:$widthLine.value,
    }
    const canvasConfig = {
        width:window.innerWidth,
        height:window.innerHeight - $('#formDropDown').offsetHeight,
    } 

    paintArea.width = canvasConfig.width
    paintArea.height = canvasConfig.height
    


    $widthLine.onchange = changeLineWidth
    $alColorCheck.onclick = startAlColorMode
    $allClearBtn.onclick = clearPaintArea
    $eraserCheck.onclick = startRubberMode

    paintArea.onpointerdown = initDraw
    paintArea.onpointermove = draw
    paintArea.onpointerup = drawLeave
    paintArea.onpointerout = drawLeave
    paintArea.onpointercancel = drawLeave

    
    function startRubberMode(evt){
        if($eraserCheck.checked){
            lineConfig.color = '#fff'
            eraserMode = true
            paintArea.style.cursor = 'url("./cursor/Eraser.cur"),auto'
        }else{
            eraserMode = false
            paintArea.style.cursor = 'url("./cursor/Pencil_Normal_select.cur"),auto'
        }
    }
    function clearPaintArea(evt){
        evt.preventDefault()
        
        paintArea.getContext('2d').clearRect(0, 0, paintArea.width, paintArea.height)
        context.fillStyle = '#fff'
        context.fillRect(0, 0, paintArea.width, paintArea.height)
        paintArea.style.borderColor = 'cyan'
    }
    function changeLineWidth(evt){
        lineConfig.lineWidth = $widthLine.value
    }
    function startAlColorMode(evt){
        if($alColorCheck.checked){
            aleatoryColorMode = true
        }else{
            aleatoryColorMode = false
        }
    }




})()
