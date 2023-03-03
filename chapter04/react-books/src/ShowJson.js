export default function ShowJson({ children }) {
    return <div>
        <pre>{JSON.stringify(children, undefined, 2)}</pre>
    </div>
};
