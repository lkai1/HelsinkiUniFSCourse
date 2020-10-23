import React from 'react'

interface ContentProps {
    courseParts: Array<string>;
}
const Content: React.FC<ContentProps> = props => {
    return (
        <span>
            {props.courseParts.map(cp => <p key={cp}>{cp}</p>)}
        </span>
    )
}
export default Content;