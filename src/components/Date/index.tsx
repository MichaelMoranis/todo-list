import calendar from "../../assets/calendar.png"

export default function CurrentDate() {
    const currentDate = new Date().toLocaleDateString()
    return (
        <div>
            <p className="flex  items-center  gap-4 text-xl font-mono">
                <img className="h-4 w-4" src={calendar} alt="calendar date" />
                {currentDate}
            </p>
        </div>
    )
}