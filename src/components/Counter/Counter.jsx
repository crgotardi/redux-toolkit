import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  decrement,
  increment,
  incrementByAmount,
  incrementAsync,
  incrementWithPrepare,
  selectCounter,
  selectCounterPlusAmount,
  selectGlobalCounter,
  selectStatus,
  selectGlobalStatus,
} from '../../store/reducers/counterReducer'

function Counter() {
  const [amount, setAmount] = useState(0)
  const dispatch = useDispatch()
  const counter = useSelector(selectCounter)
  const status = useSelector(selectStatus)
  const globalCounter = useSelector(selectGlobalCounter)
  const globalStatus = useSelector(selectGlobalStatus)
  const counterPlusAmount = useSelector(selectCounterPlusAmount)

  return (
    <div>
      Value: {counter} | {status === 'loading' && <span>Loading...</span>}
      global Value: {globalCounter} | {globalStatus === 'loading' && <span>Loading...</span>}
      plus amount Value: {counterPlusAmount}
      <br></br>
      <button onClick={() => { dispatch(decrement()) }}>
        Decrement
      </button>
      <button onClick={() => { dispatch(increment()) }}>
        Increment
      </button>
      <br></br>
      <input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} />
      <button onClick={() => {
        dispatch(incrementByAmount(amount))
      }}>
        Increment amount
      </button>
      <button onClick={() => {
        dispatch(incrementAsync(amount))
      }}>
        Increment async
      </button>
      <button onClick={() => {
        dispatch(incrementWithPrepare({amount: amount}))
      }}>
        Increment with prepare
      </button>
    </div>
  )
}

export default Counter