<template>
  <div class="main">
		<Introduce :name="name" :score="score" class="introduce"></Introduce>
		<Self ref="self" @send="sendMessage" :No="No" :card="selfCard" :before="before" class="self"></Self>
		<Chat ref="chat" :name="name" @send="sendMessage" class="chat"></Chat>
		<ul>
			<li v-for="item in players" :key="item.name" :style="{color: item.winner?'red':'black'}">
				<p>{{item.name}}</p>
				<p>{{item.score}}</p>
				<div style="display: flex;">
					<p>{{item.cardA}}</p>
					<span>{{item.cardB}}</span>
				</div>
				<p>{{item.option}}</p>
			</li>
		</ul>
  </div>
</template>

<script>
import Chat from './components/Chat.vue';	
import Introduce from './components/Introduce.vue';
import Self from './components/Self.vue';

const ws = new WebSocket('ws://localhost:8090');

export default {
  name: 'app',
	components:{
		Chat,
		Introduce,
		Self,
	},
	data()  {
		return {
			name: '',
			message: '',
			players: [],
			selfNo: 0,
			before: 0,
			selfCard: [],
			others: [],
			first: 0,
			score: 0,
			palyerCount: 6,
			now: 0,
		}
	},
	mounted() {		
		ws.onmessage = (data) => {
			const message = JSON.parse(data.data);
			if (message.type === 'name') {
				this.name = message.name;
			}
			if (message.type === 'chat') {
				this.$refs.chat.messageList.push(message);
			}
			if (message.type === 'init') {
				this.players = message.member;
				message.member.forEach((mb) => {
					mb.option = '';
					mb.winner = false;
					mb.cardA = '';
					mb.cardB = '';
					if (mb.name === this.name) {
						this.selfNo = mb.websocNo;
						this.score = mb.score;
					}
				})
			}
			if (message.type === 'option') {
				this.now = message.now;
				if (this.now === this.selfNo) return;
				this.players.forEach((player) => {
					if (player.name === message.name) {
						player.option = message.content;
						return;
					}
				})
			}
			if (message.type === 'start') {
				this.first = message.value; 
				this.selfCard = message.card;
			}
			if (message.type === 'result') {
				this.$refs.self.option = '';
				this.score += message.results[this.No-1].score;
				this.players.forEach((player) => {
						let position = (this.palyerCount + player.websocNo - this.first) % this.palyerCount;
						let item = message.results[position];
						player.score += item.score;	
						player.winner = item.winner;
						player.cardA = item.cardA;
						player.cardB = item.cardB;
				})
			}
		};
		/*
		ws.addEventListener('open',() => {
			const message = {
				type: 'firstConnect',
				name: this.name,
			}
			ws.send(JSON.stringify(message));
		});
		*/
	},
	computed: {
		No () {
			return (this.palyerCount +  this.selfNo - this.first) % this.palyerCount + 1; 
		}
	},
	methods: {
		sendMessage (message) {
			ws.send(message);
		}
	}
}
</script>

<style scoped lang="less">
	.main {
		display: grid;
		grid-template-columns: 1fr 2fr 1fr;
		grid-template-columns: 1fr 2fr 1fr;
	}
	.chat {
		text-align: center;
		display: block;				
		grid-row: 3/4;
		grid-column: 3/4;
	}
	.introduce {
		text-align: center;
		display: block;		
		grid-row: 1/2;
		grid-column: 3/4;
	}
	.self {
		text-align: center;
		grid-row: 2/3;
		grid-column: 3/4;
	}
	ul {
		display: block;
	}
	
</style>
