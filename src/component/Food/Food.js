import './index.css'

function Food({foodPosition}){
    return (
        <div className='food' style={{top:`${foodPosition[0]}%` , left:`${foodPosition[1]}%`}}></div>
    )
}

export default Food;