import React from 'react'

import Repl from './Repl'
import Header from './Header';

import styles from './App.module.css'

export default class App extends React.Component {
  state = {
    error: null,
    shareUrl: null
  }
  componentDidMount() {
    if (!window.Terser) {
      this.setState({
        error: new Error('Could not load Terser from jsdelivr')
      })
    }
  }
  onReplShareUrlChange(shareUrl) {
    this.setState({ shareUrl })
  }
  render() {
    const { error } = this.state

    const body = (() => {
      if (error) {
        return (
          <div className={styles.message + ' ' + styles.error}>
            {error?.message || 'An error has occurred'}
          </div>
        )
      } else {
        return <Repl terser={window.Terser} onReplShareUrlChange={this.onReplShareUrlChange.bind(this)} />
      }
    })()

    return (
      <div className={styles.container}>
        <Header shareUrl={this.state.shareUrl} />
        {body}
      </div>
    )
  }
}
