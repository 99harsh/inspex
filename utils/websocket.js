const _init_socket = () => {
    const createRoom = document.querySelector("#inspex-create-room");
    const joinRoom = document.querySelector("#inspex-join-room");
    const roomCode = document.querySelector("#inpsex-room-code-loading");
    createRoom?.addEventListener("click", (event) => {
        createRoom.style.setProperty("display", "none");
        joinRoom.style.setProperty("display", "none");
        roomCode.innerHTML = "Please Wait...";
        roomCode.style.setProperty("display", "block");
        socket = new WebSocket("https://7d16-43-249-55-188.ngrok-free.app");
        socket.addEventListener('open', () => {

            room_owner = "host";
            const bodyClone = document.body.cloneNode(true);

            // Remove script tags from the cloned body
            const scripts = Array.from(bodyClone.querySelectorAll('script'));
            scripts.forEach(script => script.remove());

            const link = Array.from(bodyClone.querySelectorAll('link'));
            link.forEach(link => link.remove());

            const iframe = Array.from(bodyClone.querySelectorAll('iframe'));
            iframe.forEach(iframe => iframe.remove());

            // Get the HTML of the cloned body without scripts
            const bodyWithoutScripts = bodyClone.innerHTML;
 
            _listen_socket_events(socket)
            socket.send(JSON.stringify({ event: "create_room", dom: bodyWithoutScripts }));
        });

        socket.addEventListener("error", (e)=>{
            roomCode.innerText = "Something went wrong!";
        })



    })

    joinRoom?.addEventListener("click", (event) => {
        const joinRoomContainer = document.querySelector(".inspex-join-room-wrapper");
        const joinRoomInput = document.querySelector("#inspex-join-room-input");
        const joinRoomBtn = document.querySelector("#inspex-join-room-btn");
        const backButton = document.querySelector("#inspex-back-button");
        const joinLoadingText = document.querySelector("#inspex-join-loading");
        backButton.addEventListener("click", (e)=>{
            
            joinRoomContainer.style.setProperty("display","none", "important")
        })
        let roomInputCode = "";

        joinRoomContainer.style.setProperty("display", "flex", "important");
        joinRoomInput.addEventListener("input", (e) => {
            roomInputCode = e.target.value;
        })

        joinRoomBtn.addEventListener("click", (e) => {
            if (roomInputCode.length == 6) {
                joinLoadingText.style.setProperty("color", "black");
                joinLoadingText.style.setProperty("display", "block", "important");
                joinLoadingText.innerText = "Please wait...";
                room_owner = "client";
                socket = new WebSocket("https://7d16-43-249-55-188.ngrok-free.app");
                socket.addEventListener('open', () => {
                    _listen_socket_events(socket)
                    socket.send(JSON.stringify({ event: "join_room", room_id: roomInputCode }))
                });
                socket.addEventListener("error", (e)=>{
                    joinLoadingText.style.setProperty("color", "red");
                    joinLoadingText.style.setProperty("display", "block", "important");
                    joinLoadingText.innerText = "Something went wrong!";
                })
            }
        })
    })
}

const _listen_socket_events = (socket) => {
    socket?.addEventListener('message', (event) => {
        const data = JSON.parse(event.data);
        if (data.event == "exchange_dom") {
            
            isSocketConnected = true;
            room_id = data.room_id;
            client_id = data.client_id;
            let loading = document.querySelector("#inpsex-room-code-loading");
            loading.innerHTML = "Room Id:- " + room_id;
            // applyUpdatedDom(data.processed_dom);
            const body = document.body;
            const elements = Array.from(body.childNodes);
            const tags = ["script", "link", "iframe", "style"];
            elements.forEach(element => {
                if (element.nodeType === Node.ELEMENT_NODE && !tags.includes(element.tagName.toLowerCase())) {
                    body.removeChild(element);
                }

            });

            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = data.processed_dom;

            // Insert the new content at the beginning of the body
            while (tempDiv.firstChild) {
                body.insertBefore(tempDiv.firstChild, body.firstChild);
            }
            if (room_owner == "client") {
                const joinRoomContainer = document.querySelector(".inspex-join-room-wrapper");
                joinRoomContainer.style.setProperty("display", "none");
                const createRoomBtn = document.querySelector("#inspex-create-room");
                createRoomBtn.style.setProperty("display", "none");
                const connectedText = document.querySelector("#inpsex-room-code-loading");
                connectedText.innerHTML = "Connected | Room ID:-"+room_id;
                connectedText.style.setProperty("display", "block");
                connectedText.style.setProperty("color", "#4BB543")
                const joinRoomBtn = document.querySelector("#inspex-join-room");
                joinRoomBtn.style.setProperty("display", "none");
                const joinLoadingText = document.querySelector("#inspex-join-loading");
                joinLoadingText.innerText = "";
                joinLoadingText.style.setProperty("display", "none", "important");
            }

        } else if (data.event == "listen_change") {
            const targetDiv = document.querySelector([`[data-unique-id="${data.unique_id}"]`]);
            if (targetDiv) {
                for (let style of data.styles) {
                    targetDiv.style.setProperty(style.name, style.style);
                }
            }
        } else if (data.event == "lock_element") {
            lockId.push(data.unique_id);
            const lockElement = document.querySelector([`[data-unique-id="${data.unique_id}"]`]);
            if (lockElement) {
                lockElement.style.setProperty("outline", "1px solid orange");
            }
        } else if (data.event == "unlock_element") {
          
            const lockElement = document.querySelector([`[data-unique-id="${data.unique_id}"]`]);
            if (lockElement) {
                lockElement.style.setProperty("outline", "none");
            }
            const index = lockId.findIndex((element) => element == data.unique_id);
            if(index != -1){
                lockId.splice(index, 1);
            }
        } else if (data.event == "listen_innertext_change") {
            const element = document.querySelector([`[data-unique-id="${data.unique_id}"]`]);
            if (element) {
                element.innerText = data.text;
            }
        } else if (data.event == "listen_drag") {
            const element = document.querySelector([`[data-unique-id="${data.unique_id}"]`]);
            const blankdiv = document.createElement("div");
            const computedStyle = window.getComputedStyle(element);
            if (element && data.checked) {
                if (element.getAttribute("inspex-drag-container") || element.parentElement.getAttribute("inspex-drag-container")) {
                    element.parentElement.setAttribute("style", "position: fixed; width:100%; height:100%; top:0; left:0;")
                    element.style.setProperty("width", computedStyle["width"], "important");
                    element.style.setProperty("left", element.getBoundingClientRect().left + "px");
                    element.style.setProperty("top", element.getBoundingClientRect().top + "px")
                    element.style.setProperty("z-index", "10", "important");
                    element.style.setProperty("right", "auto", "important");
                    element.style.setProperty("bottom", "auto", "important");
                    element.style.setProperty("position", "fixed");
                } else {
                    const div = document.createElement("div");
                    const uniqueId = data.lockheight_id;
                    blankdiv.setAttribute("style", `width: ${element.getBoundingClientRect().width}px;`)
                    blankdiv.id = uniqueId
                    div.setAttribute("inspex-drag-container", "true");
                    div.setAttribute("inspex-lock-height-id", uniqueId)
                    div.setAttribute("style", "position: fixed; width:100%; height:100%; top:0; left:0;");
                    isDragabble = true
                    element.style.setProperty("width", computedStyle["width"], "important");
                    element.style.setProperty("left", element.getBoundingClientRect().left + "px");
                    element.style.setProperty("top", element.getBoundingClientRect().top + "px")
                    element.style.setProperty("z-index", "10", "important");
                    element.style.setProperty("right", "auto", "important");
                    element.style.setProperty("bottom", "auto", "important");
                    element.style.setProperty("position", "fixed");
                    element.parentElement.appendChild(div);
                    element.insertAdjacentElement("afterend", blankdiv);
                    div.appendChild(element)

                }
                element.style.setProperty("cursor", "move", "important");
                element.style.setProperty("outline", "1px solid rgba(235, 86, 142, 1)", "important")


            }
        } else if (data.event == "lock_height") {
            const element = document.getElementById(data.unique_id);
            if (element) {
                for (let style of data.styles) {
                    element.style.setProperty(style.name, style.style);
                }
            }
        } else if (data.event == "request_dom") {
            const bodyClone = document.body.cloneNode(true);

            // Remove script tags from the cloned body
            const scripts = Array.from(bodyClone.querySelectorAll('script'));
            scripts.forEach(script => script.remove());

            const link = Array.from(bodyClone.querySelectorAll('link'));
            link.forEach(link => link.remove());

            const iframe = Array.from(bodyClone.querySelectorAll('iframe'));
            iframe.forEach(iframe => iframe.remove());

            // Get the HTML of the cloned body without scripts
            const bodyWithoutScripts = bodyClone.innerHTML;

            socket.send(JSON.stringify({ event: "requested_dom", dom: bodyWithoutScripts, client_id: data.client_id, room_id }));
        } else if(data.event == "error"){
            if(data.statusCode == 404){
                const joinLoadingText = document.querySelector("#inspex-join-loading");
                joinLoadingText.style.setProperty("color", "red");
                joinLoadingText.innerText = "Room ID Not Found";
            }
        }
    });

}