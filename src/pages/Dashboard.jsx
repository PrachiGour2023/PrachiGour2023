import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';

function Dashboard() {

    const [data, setData] = useState({
        user: [],
        post: [],
        todo: []
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchDashboardData();
    }, [])

    const fetchDashboardData = async () => {
        setLoading(true)
        try {
            const [userRes, postsRes, todosRes] = await Promise.all([
                fetch('https://jsonplaceholder.typicode.com/users'),
                fetch('https://jsonplaceholder.typicode.com/posts'),
                fetch('https://jsonplaceholder.typicode.com/todos')
            ])
            const user = await userRes.json();
            const post = await postsRes.json();
            const todo = await todosRes.json();

            setData({ user, post, todo })

        } catch (error) {
            setError(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <Box
                sx={{
                    width: '100%',
                    display: 'flex',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(min(200px, 100%), 1fr))',
                    gap: 2,
                }}
            >
                {
                    data?.user?.map((item, i) => {
                        return (
                            <Card key={i}>
                                <CardActionArea
                                    sx={{
                                        height: '100%',
                                        '&[data-active]': {
                                            backgroundColor: 'action.selected',
                                            '&:hover': {
                                                backgroundColor: 'action.selectedHover',
                                            },
                                        },
                                    }}
                                >
                                    <CardContent sx={{ height: '100%' }}>
                                        <Typography variant="h5" component="div">
                                            {item.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {item.email}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>


                        )
                    })
                }
            </Box>
        </>
    )
}

export default Dashboard

