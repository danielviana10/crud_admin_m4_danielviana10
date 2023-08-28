import app from './app'
import "dotenv/config";
import { startDatabase } from './database';

const PORT: number = Number(process.env.PORT || 3000);

app.listen(PORT, async () => {
    await startDatabase()
    console.log(`App running on port ${PORT}`)
})
