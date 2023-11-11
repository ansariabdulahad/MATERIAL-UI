import './calender.css';

import FullCalender from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { Button, ButtonGroup, Card, CardContent, Typography } from '@mui/material';
import { useRef } from 'react';

const Calender = () => {

    const cal = useRef();

    const todayDate = () => {
        const date = new Date();
        let dd = date.getDate();
        let mm = date.toLocaleDateString('default', { month: 'long' });
        let yy = date.getFullYear();

        dd = dd < 10 ? '0' + dd : dd;

        return dd + " " + mm + " " + yy;
    }

    const next = () => {
        const calender = cal.current.getApi();
        calender.next();
    }

    const prev = () => {
        const calender = cal.current.getApi();
        calender.prev();
    }

    const today = () => {
        const calender = cal.current.getApi();
        calender.today();
    }

    const design = (
        <>
            <Card className='shadow-sm border'>
                <CardContent>
                    <div className='d-flex justify-content-between align-items-center p-4'>
                        <ButtonGroup>
                            <Button onClick={prev} className='py-2'>
                                <span className='material-icons-outlined'>arrow_left</span>
                                Prev
                            </Button>
                            <Button onClick={next} className='py-2'>
                                Next
                                <span className='material-icons-outlined'>arrow_right</span>
                            </Button>
                        </ButtonGroup>
                        <Typography
                            variant='h5'
                            component={'div'}
                        >
                            {todayDate()}
                        </Typography>
                        <Button onClick={today} variant='outlined' color='warning'>Today</Button>
                    </div>
                    <FullCalender
                        ref={cal}
                        plugins={[dayGridPlugin]}
                        initialView='dayGridMonth'
                        events={[
                            {
                                title: "Anup's Birthday",
                                date: "2023-11-08",
                                color: 'orange'
                            },
                            {
                                title: "Purchase car",
                                date: '2023-11-23',
                                color: 'black'
                            }
                        ]}
                        headerToolbar={{
                            start: '',
                            center: '',
                            end: ''
                        }}
                        eventDisplay='list-item'
                    />
                </CardContent>
            </Card>
        </>
    );
    return design;
}

export default Calender;