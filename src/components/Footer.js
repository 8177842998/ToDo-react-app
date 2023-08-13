import React from 'react'

const Footer = () => {

  let footerStyle= {
    position: 'absolute',
     top: '100vh',
     width: '100%',
    
  }
  return (
    <footer className='bg-dark text-light'>
<p className="text-center py-3" style={footerStyle}>
      Copyright &copy; MyTodoList.app
      </p>
    </footer>
  )
}

export default Footer
