// class Counter extends HTMLButtonElement {
// 	constructor(){
// 		super()
// 		console.log('Счетчик начался');
// 		this.counter = 0;
// 		this.innerText = this.counter;
// 		this.addEventListener('click', ()=>this.innerText = ++this.counter);
// 	}

// }

// customElements.define('counter-btn', Counter, {extends: 'button'});

//*************************

// Теневой Дом

class Hello extends HTMLElement {
	connectedCallback(){

		this.attachShadow({mode: 'open'})

		this.addEventListener('click', ()=>{const user_id = +this.getAttribute('user-id') + 1;
		this.setAttribute('user-id', user_id);
	
		})
	}

	render(user){

		if (!user) {
			this.setAttribute('user-id', 1);
			return
		}

		this.shadowRoot.innerHTML = `
		<user-card 	
					 name 		=	${user.first_name}
					 last_name 	=	${user.last_name}
					 avatarURL 	=	${user.avatar}

		> </user-card>
		`;
	}

	getUserById(id, callback){
		const url = `https://reqres.in/api/users/${id}`;
	fetch(url)
		.then(elem=>elem.json(), 
				err=>console.log(err))
		.then(elem=>callback(elem.data),
				err=>console.log(err))
	}

	static get observedAttributes() {
		return ['user-id']
	}

	attributeChangedCallback(attrName, oldValue, newValue) {
		if (attrName === 'user-id'){
			this.getUserById(newValue, this.render.bind(this))
		}
	}
}


class UserCard extends HTMLElement {
	constructor(){
		super()
		this.innerHTML = '<link rel="stylesheet" href="css/style.css">' // стилизовали tag "p"
		const name 		=	this.getAttribute('name');
		const lastname 	= 	this.getAttribute('lastname');
		const avatarURL = 	this.getAttribute('avatarURL');

		const nameElem 		= document.createElement('p')	
		const lastnameElem 	= document.createElement('p')
		const avatarElem 	= document.createElement('img')

		nameElem.innerText 		= name; 
		lastnameElem.innerText 	= lastname; 
		avatarElem.src 			= avatarURL;

		this.appendChild(avatarElem);
		this.appendChild(nameElem);
		this.appendChild(lastnameElem);

		avatarElem.addEventListener('click', function(){
			console.log('***');
		})
	}
}

customElements.define('user-card', UserCard)
customElements.define('hello-tag', Hello)
