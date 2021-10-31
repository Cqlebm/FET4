class Member{
    constructor(song, artist){
        this.song = song;
        this.artist = artist;
    }
}

class Playlist{
    constructor(id, name){
        this.id = id;
        this.name = name;
        this.members = [];
    }

    addMember(member){
        this.members.push(member);
    }

    deleteMember(member){
        let idex = this.members.indexOf(member);
        this.members.splice(index, 1);
    }
}

let playlists = [];
let playlistId = 0;

onClick('new-playlist', () => {
    playlists.push(new Playlist(playlistId++, getValue('new-playlist-name')));
    drawDom();
});

function onClick(id, action){
    let element = document.getElementById(id);
    element.addEventListener('click', action);
    return element;
}

function getValue(id){
    return document.getElementById(id).value;
}

function drawDom(){
    let playlistDiv = document.getElementById('playlists');
    clearElement(playlistDiv);
    for (playlist of playlists){
        let table = createPlaylistTable(playlist);
        let title = document.createElement('h2');
        title.innerHTML = playlist.name;
        title.appendChild(createDeletePlaylistButton(playlist));
        playlistDiv.appendChild(title);
        playlistDiv.appendChild(table);
        for (member of playlist.members){
            createMemberRow(playlist, table, member);
        }
    }
}

function createMemberRow(playlist, table, member){
    let row = table.insertRow(2);
    row.insertCell(0).innerHTML = member.song;
    row.insertCell(1).innerHTML = member.artist;
    let actions = row.insertCell(2);
    actions.appendChild(createDeleteRowButton(playlist, member));
}

function createDeleteRowButton(playlist, member){
    let btn = document.createElement('button');
    btn.className = 'btn btn-primary';
    btn.innerHTML = 'Delete';
    btn.onClick = () =>{
        let index = playlist.members.indexOf(member);
        playlist.members.splice(index, 1);
        drawDom();
    };
    return btn;
}

function createDeletePlaylistButton(playlist){
    let btn = document.createElement('button');
    btn.className = 'btn btn-primary';
    btn.innerHTML = 'Delete Playlist';
    btn.onClick = () =>{
        let index = playlists.indexOf(playlist);
        playlists.splice(index, 1);
        drawDom();
    };
    return btn;
}

function createNewMemberButton(playlist){
    let btn = document.createElement('btn');
    btn.className = 'btn btn-primary';
    btn.innerHTML = 'create';
    btn.onClick = () => {
        playlist.members.push(new Member(getValue(`song-input-${playlist.id}`), getValue(`artist-input-${playlist.id}`)));
        drawDom();
    };
    return btn;
}

function createPlaylistTable(playlist){
    let table = document.createElement('table');
    table.setAttribute('class', 'table table-dark table-striped');
    let row = table.insertRow(0);
    let songCollum = document.createElement('th');
    let artistCollum = document.createElement('th');
    songCollum.innerHTML = 'Song';
    artistCollum.innerHTML = 'Artist';
    row.appendChild(songCollum);
    row.appendChild(artistCollum);
    let formRow = table.insertRow(1);
    let songTh = document.createElement('th');
    let artistTh = document.createElement('th');
    let createTh = document.createElement('th');
    let songInput = document.createElement('input');
    songInput.setAttribute('id', `song-input-${playlist.id}`);
    songInput.setAttribute('type', 'text');
    songInput.setAttribute('class', 'form-control');
    let artistInput = document.createElement('input');
    artistInput.setAttribute('id', `artist-input-${playlist.id}`);
    artistInput.setAttribute('type', 'text');
    artistInput.setAttribute('class', 'form-control');
    let newMemberButton = createNewMemberButton(playlist);
    songTh.appendChild(songInput);
    artistTh.appendChild(artistInput);
    createTh.appendChild(newMemberButton);
    formRow.appendChild(songTh);
    formRow.appendChild(artistTh);
    formRow.appendChild(createTh);
    return table;
}

function clearElement(element){
    while (element.firstChild){
        element.removeChild(element.firstChild);
    }
}