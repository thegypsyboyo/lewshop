import React from 'react'
import styles from "./styles.module.scss"
import Add from "./Ad"
import Top from './Top'
import Main from './Main'
export default function index() {
  return (
    <header className={styles.header}>
      <Add />
      <Top />
      <Main/>
    </header>
  )
}
