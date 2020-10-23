import React from 'react'

interface ContentProps {
    courseParts: Array<string>;
}
const Content: React.FC<{ courseParts: CoursePart[] }> = props => {
    return (
        <span>
            {props.courseParts.map(cp => <p key={cp}>{cp}</p>)}
        </span>
    )
}
export default Content;