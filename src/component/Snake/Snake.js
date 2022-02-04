import './index.css'

function Snake({position}){
    return(
        position.map((item,key)=>(
            <div key={key} style={{top: `${item[0]}%`, left: `${item[1]}%`}} className='snake-dot'></div>
        ))
    )

}

export default Snake;