<script lang="ts">
import { onMount } from 'svelte';
let value:string = 'Helllo World';
let morse:string = '';
let audioContext:any;
let o:any;
let morsefyChar = (char:string):string => {
    switch (char) {
        case 'a':
            return '.-';
        case 'b':
            return '-...';
        case 'c':
            return '-.-.';
        case 'd':
            return '-..';
        case 'e':
            return '.';
        case 'f':
            return '..-.';
        case 'g':
            return '--.';
        case 'h':
            return '....';
        case 'i':
            return '..';
        case 'j':
            return '.---';
        case 'k':
            return '-.-';
        case 'l':
            return '.-..';
        case 'm':
            return '--';
        case 'n':
            return '-.';
        case 'o':
            return '---';
        case 'p':
            return '.--.';
        case 'q':
            return '--.-';
        case 'r':
            return '.-.';
        case 's':
            return '...';
        case 't':
            return '-';
        case 'u':
            return '..-';
        case 'v':
            return '...-';
        case 'w':
            return '.--';
        case 'x':
            return '-..-';
        case 'y':
            return '-.--';
        case 'z':
            return '--..';
        case '1':
            return '.----';
        case '2':
            return '..---';
        case '3':
            return '...--';
        case '4':
            return '....-';
        case '5':
            return '.....';
        case '6':
            return '-....';
        case '7':
            return '--...';
        case '8':
            return '---..';
        case '9':
            return '----.';
        case '0':
            return '-----';
        case ' ':
            return '/';
        default:
            return '';
    }
};



onMount(() => {
    console.log('MorseMischief Mounted');
     audioContext = new window.AudioContext();
     o = audioContext.createOscillator();
     o.type = "sine"
        o.connect(audioContext.destination)
        
     morse = morsefy(value,o);
    });

$: morse = morsefy(value,o);



function morsefy(text:string,o:any):string {
    let morse:string = '';
    for (let i = 0; i < text.length; i++) {
        morse += morsefyChar(text[i].toLowerCase())+ ' ';
           }
    
    return morse;
}


</script>

<div class="morse-mischief">
    <div class="morse-continer">
        <div class="morse-mischief__preview typewriter"><p>{morse}</p></div>
        <div class="morse-mischief__morse">
        <input type="text" bind:value={value} class="morse-mischief__input" />
        </div>
    </div>

</div>

<style>
.morse-mischief {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.morse-continer {
  width: 800px;
  max-width: 100%;
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

}
input{
    width: 100%;
    height: 100%;
    font-size: 2rem;
    background-color: transparent;
    border: none;
    border-bottom: 1px solid #fff;
    outline: none;
    color: #fff;
    font-family: monospace;
    text-align: center;
    word-wrap: break-word;
}
.morse-mischief__preview{ 
    background-color:transparent;
}
.typewriter p {
  width:auto;
  color: #fff;
  font-family: monospace;
  overflow: hidden; /* Ensures the content is not revealed until the animation */
  margin: 0 auto; /* Gives that scrolling effect as the typing happens */
  letter-spacing: .15em; /* Adjust as needed */
  word-wrap: break-word;
}





</style>
