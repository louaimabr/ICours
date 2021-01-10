import React, {Children,useState} from 'react';

export const Tabs = ({children}) => {
    const childrenArray = Children.toArray(children)
    const [current, setCurrent] = useState(childrenArray[0].key)
    const newChildren = childrenArray.map(child =>{
        return React.cloneElement(child, { selected : child.key === current})
    })
    const currentChild = newChildren.find(child => child.key === current)
    return (
        <>
            <nav>
                {childrenArray.map(child =>(
                    <p onClick={() => setCurrent(child.key)} key={child.key}>
                        {child.props.title}
                    </p>
                ))}
            </nav>
            <div className="showTab" style={{backgroundColor : currentChild.props.color}}>
                {newChildren}
            </div>
        </>
    );
};

export const Tab = ({children, selected,classN}) =>{
    return (
        <div className={classN} hidden={!selected}>{children}</div>
    )
}