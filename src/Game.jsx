import './Game.scss';

import { useEffect, useState } from 'react';
import { GameCard } from "./GameCard";

var temp=[];

const Game = () =>{

    // card array
    const [card,setCard]=useState(null);
    const [start,setStart]=useState(false);
    const [click,setClick]=useState(0);

    // check prime fn
    const isPrime = num =>{
        for ( var i = 2; i < num; i++ ) {
            if ( num % i === 0 ) {
                return false;
            }
        }
        return true;
    }

    // rand fn
    const randSort = (arr) => {
        return arr.sort(() => Math.round(Math.random() * 100) - 50);
    }

    // generate fn
    const generateCard = (from,to) =>{
        var arr = [];
        for ( var i = from; i < to; i+=2 ) {
            if ( isPrime(i) ) {
                arr.push({
                    show:true,
                    active:false,
                    number:i,
                    error:false
                });
            }
        }
        arr=arr.concat(arr);
        setCard(randSort(arr));
    }

    // start hidding
    const hideCard = () =>{
        setCard(card.map(item=>item.active?item:{...item,show:false}));
    }
    
    // finish fn
    const checkFinish = () =>{
        if(!card.filter(item=>item.active==false).length){
            alert('Greet! Well done');
        }
    }

    // clear selected card
    const clearSelected = () => {
        temp=[];
        card.map(item=>item.active?'':item.show=false);
        card.map(item=>item.error=false);
        setCard([...card]);
    }

    // click event
    const checkCard = item =>{
        setClick(click+1);

        // clear old
        if(temp.length==2){
            clearSelected();
        }
        // insert new item
        temp.push(item);
        temp.map(item=>item.show=true);

        // two card selected
        if(temp.length==2){
            if(temp[0].number===temp[1].number){
                temp.map(item=>item.active=true);
            }else{
                temp.map(item=>item.error=true);
            }
        }
        setCard([...card]);
        checkFinish();
    }

    // on start
    useEffect(()=>{
        setStart(true);
        generateCard(1,50);
    },[]);

    // on card generated
    useEffect(()=>{
        setTimeout(()=>hideCard(),10000);
    },[start]);

    return (
        <div className={`game ${start?'active':''}`} onClick={()=>clearSelected()}>
            <div className='game-content'>
                <div className="game-title">Best memory game</div>
                <div className='game-grid'>
                    {card?card.map((item,i)=>
                        <GameCard key={i} item={item} show={()=>checkCard(item)}></GameCard>
                    ):<></>}
                </div>
                <div className='game-score'>Game score: {click}</div>
            </div>
        </div>
    )
}

export {Game}