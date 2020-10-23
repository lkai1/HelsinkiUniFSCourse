import React from 'react'

interface HeaderProps {
    courseName: string;
}
const Header: React.FC<HeaderProps> = props => {

    return (
        <p>{props.courseName}</p>
    )
}
export default Header