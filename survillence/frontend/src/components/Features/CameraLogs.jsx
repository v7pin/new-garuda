import React from 'react';
import { useSelector } from 'react-redux';
import { IoCalendarClear, IoTime, IoAlertCircle } from "react-icons/io5";
import moment from "moment-timezone";

const CameraLogs = () => {
    // Select logs from the Redux store
    const logs = useSelector(state => state.crime.logs);

    return (
        <div className="h-full overflow-y-auto">
            {logs.map((log, index) => (
                <div key={index} className="p-4 border-b border-gray-300 flex flex-col">
                    <div className="flex items-center mb-1">
                        <IoCalendarClear className="text-gray-600 mr-2" />
                        <span>{moment(log.date).format("YYYY-MM-DD")}</span>
                    </div>
                    <div className="flex items-center mb-1">
                        <IoTime className="text-gray-600 mr-2" />
                        <span>{log.time}</span>
                    </div>
                    <div className="flex items-center">
                        <IoAlertCircle className={`mr-2 ${log.reported ? 'text-green-600' : 'text-gray-600'}`} />
                        <span className={`${log.reported ? 'text-green-600' : 'text-gray-600'}`}>{log.type}</span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CameraLogs;
