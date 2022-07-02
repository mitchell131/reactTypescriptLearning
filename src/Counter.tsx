import React, { useState, lazy, Suspense, ReactNode } from 'react'
import Button from './Button.jsx'

const DefaultComponent = lazy(async() => await import('./MyDefaultComponent.jsx'))

const Container = ({ children }:any) => {
  // if (children) {
  // Pay attention here. To really check if children is empty use the following
  if (React.Children.toArray(children).length) {  
    return (
      <div className="children-container">
        <p>The content of children is:</p>
        { children }
      </div>
    ) 
  } else {
    return (
      <React.Fragment>
        Empty
      </React.Fragment>
    )
  }
}

//Playing with typescript
type HeadingProps = {
  title?: string,
  language?: string, // 👈️ mark optional
  country?: string,
};

const Heading = (props: HeadingProps) => {
  return (
    <>{props.title}</>
  )
}

const defaultProp = {
  children: <span>Default Children</span>,
  heading: <strong>Default Heading</strong>
}

type HeadingWithContentProps = {
  children: ReactNode,
  heading: typeof defaultProp
};

const HeadingWithContent = (props: HeadingWithContentProps) => {
  return (
    <>
      <h2>{props.heading}</h2>
      <div>{props.children}</div>
    </>
    
  )
}

HeadingWithContent.defaultProps = defaultProp

//Functional Props
const TextWithnumber = ({ children } : { children: (num:number) => ReactNode }) => {
  const [state, setState] = useState<number|null>(1)

}

function identity<ArgType>(arg: ArgType): ArgType {
  return arg;
}


function List<ListItem>({items, render}: {items: ListItem[], render: (item: ListItem) =>  ReactNode}) {
  return (
       <ul>{items.map((item, index) => (
        <li key={index}>{render(item)}</li>
       ))}</ul>
  )
}

export const Counter = () => {
  const [count, setCount] = useState(0)
  const [testlist, setTestList] = useState<number[]>([]) 
  const [asyncModule, setAsyncModule] = useState<String[]>([])
  

  const loadExports = async () => {

    // const names = (await import('./components/utilities/names')).default

     await import('./components/utilities/names'/* webpackChunkName: "months"*/).then(async (months) => {
      await import('./components/utilities/toUpperCase'/* webpackChunkName: "utilities"*/).then(({toUpperCase}) => {
        setAsyncModule(toUpperCase(months.default))
      })
    })
  }

  return (
    <div>
      <h3>Update the Suspensecount and edit src/App.tsx, state is preserved</h3>
      <button onClick={() => setCount((c) => c + 1)}>Count - {count}</button><br/>
      {!!testlist.length && "To test how totestObj do a proper condition with arrays"}<br/>
      <Button handleClick={() => setTestList((c) => [...c,1,2,4])} label='Add to array'/>
      <Container>
      {
        testlist.map((test) => {
          return <div className="name-item">{ test }</div>  
        })
      }
      </Container>
      <div>
        <Button label='Async Importing Default Export' handleClick={loadExports}/>
        {JSON.stringify(asyncModule)}
      </div>
      {/* Lazy loading components in React with suspense */}
      <Suspense fallback={<div>Loading...</div>} >
        {asyncModule.length > 0 && <DefaultComponent />}
      </Suspense>
      <Heading title='Heading Title'></Heading>
      <HeadingWithContent/>
      <List items={['mitchell','marisabel','martina']} render={function (item: string): ReactNode{
        return (<React.Fragment>{item.toLocaleLowerCase()}</React.Fragment>)
      }}/>
    </div>
  )
}
