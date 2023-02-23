import styled from "styled-components"

const CardWrapper = styled.div`
    margin: 0px;
    padding: 0px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 3px 3px rgba(0,0,0,.075);
`

const CardTitle = styled.h2`
    margin: 0px;
    padding: 10px;
    font-size: 1.5em;
    font-weight: normal;
    background-color: #eee;
    border-bottom: 1px solid #ccc;
`

const CardContent = styled.div`
    margin: 0px;
    padding: 10px;
`

export default function Card({title,children}) {
    return <CardWrapper>
        { title && <CardTitle>{title}</CardTitle> }
        <CardContent>{children}</CardContent>
    </CardWrapper>
};
