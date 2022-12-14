import {Typography,Container,Button,ButtonGroup} from '@mui/material';
import agent from '../../app/api/agent';

const About = () => {
    return (
        <Container>
            <Typography gutterBottom variant='h2'>Errors</Typography>
            <ButtonGroup fullWidth>
                <Button variant='contained' onClick={()=>agent.TestErrors.get400Error().catch(err=>console.log(err))}>Test 400</Button>
                <Button variant='contained' onClick={()=>agent.TestErrors.get401Error().catch(err=>console.log(err))}>Test 401</Button>
                <Button variant='contained' onClick={()=>agent.TestErrors.get404Error().catch(err=>console.log(err))}>Test 402</Button>
                <Button variant='contained' onClick={()=>agent.TestErrors.get500Error().catch(err=>console.log(err))}>Test 500</Button>
                <Button variant='contained' onClick={()=>agent.TestErrors.getValidationError().catch(err=>console.log(err))}>Test Validation</Button>
            </ButtonGroup>
        </Container>
    )
}

export default About;