const GameCard = ({item,show}) =>{
    return (
        <div className={`game-card ${item.show?'active':''} ${item.active?'correct':''} ${item.error?'error':''}`} 
            onClick={e=>{
                e.stopPropagation();
                return (item.active || item.show)?'':show()
            }}>
            <div className="game-card-front"></div>
            <div className="game-card-back">{item.show?item.number:''}</div>
        </div>
    )
}
export {GameCard}