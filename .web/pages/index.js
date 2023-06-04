import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/router"
import { connect, E, getRefValue, isTrue, preventDefault, refs, updateState, uploadFiles } from "/utils/state"
import "focus-visible/dist/focus-visible"
import { Button, Text, useColorMode, VStack } from "@chakra-ui/react"
import NextHead from "next/head"



export default function Component() {
  const [state, setState] = useState({"colors": ["yellow", "yellow", "yellow", "yellow"], "is_hydrated": false, "events": [{"name": "state.hydrate"}], "files": []})
  const [result, setResult] = useState({"state": null, "events": [], "processing": false})
  const router = useRouter()
  const socket = useRef(null)
  const { isReady } = router
  const { colorMode, toggleColorMode } = useColorMode()
  const focusRef = useRef();
  
  const Event = (events, _e) => {
      preventDefault(_e);
      setState({
        ...state,
        events: [...state.events, ...events],
      })
  }

  const File = files => setState({
    ...state,
    files,
  })

  useEffect(()=>{
    if(!isReady) {
      return;
    }
    if (!socket.current) {
      connect(socket, state, setState, result, setResult, router, ['websocket', 'polling'])
    }
    const update = async () => {
      if (result.state != null){
        setState({
          ...result.state,
          events: [...state.events, ...result.events],
        })

        setResult({
          state: null,
          events: [],
          processing: false,
        })
      }

      await updateState(state, setState, result, setResult, router, socket.current)
    }
    if (focusRef.current)
      focusRef.current.focus();
    update()
  })
  useEffect(() => {
    const change_complete = () => Event([E('state.hydrate', {})])
    router.events.on('routeChangeComplete', change_complete)
    return () => {
      router.events.off('routeChangeComplete', change_complete)
    }
  }, [router])


  return (
    <VStack>
  <Text>
  {`What is the full form of HTML?`}
</Text>
  <VStack>
  <Button onClick={_e => Event([E("state.change_color", {color:"red",index:0})], _e)} sx={{"defaultValue": "yellow", "bg": state.colors.at(0)}}>
  {`option A`}
</Button>
  <Button onClick={_e => Event([E("state.change_color", {color:"red",index:1})], _e)} sx={{"defaultValue": "yellow", "bg": state.colors.at(1)}}>
  {`option B`}
</Button>
  <Button onClick={_e => Event([E("state.change_color", {color:"green",index:2})], _e)} sx={{"defaultValue": state.colors.at(2), "bg": state.colors.at(2)}}>
  {`option C`}
</Button>
  <Button onClick={_e => Event([E("state.change_color", {color:"red",index:3})], _e)} sx={{"defaultValue": state.colors.at(3), "bg": state.colors.at(3)}}>
  {`option D`}
</Button>
</VStack>
  <NextHead>
  <title>
  {`Pynecone App`}
</title>
  <meta content="A Pynecone app." name="description"/>
  <meta content="favicon.ico" property="og:image"/>
</NextHead>
</VStack>
  )
}
