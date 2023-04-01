import cron from 'node-cron';
import WordModel from '../models/word';
import AttemptsModel from '../models/attempts';
const getOtherWord = async () =>{
    const NOT_USED = 'NOT_USED' 
    console.log('Getting a new word')
        const wordInstance = new WordModel();
        const attemptsInstance = new AttemptsModel();
        //get the new word
        const word = await wordInstance.findOne(NOT_USED);
        //update all word active to used status
        await wordInstance.updateAllToUsed();
        //reset all attempts for all users
        await attemptsInstance.resetAll();
        console.log('La palabra actual es', word);
        if(!word){
            console.log('There are words to show');
            return
        }
        await wordInstance.update('ACTIVE', word.id);
}

export const cronjob = () => {
    cron.schedule('*/5 * * * *', () => {
        getOtherWord();
        
    });
    getOtherWord();
    console.log('Cron job running');
}
