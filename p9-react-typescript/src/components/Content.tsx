import React from 'react'
const Content = (props: any) => {
    return (
        <span>
            {props.courseParts.map((cp: any) => {
                return <p key={cp.name}>{cp.name} {cp.exerciseCount}</p>
            })}
        </span>
    )
}
export default Content;