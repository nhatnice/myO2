import {useState, useEffect} from 'react';
import {Database, snapToArray, defaultO2Data} from '../../Global/Variables';

export function Controller(props) {
    const [o2, setO2] = useState(null);
    const [redirectAddNew, setRedirectAddNew] = useState(null);

    const districts = [
        {
            title: 'Quận 1',
            id: 0
        },
        {
            title: 'Quận 2',
            id: 1
        },
        {
            title: 'Quận 3',
            id: 2
        },
        {
            title: 'Quận 4',
            id: 3
        },
        {
            title: 'Quận 5',
            id: 4
        },
        {
            title: 'Quận 6',
            id: 5
        },
        {
            title: 'Quận 7',
            id: 6
        },
        {
            title: 'Quận 8',
            id: 7
        },
        {
            title: 'Quận 9',
            id: 8
        },
        {
            title: 'Quận 10',
            id: 9
        },
        {
            title: 'Quận 11',
            id: 10
        },
        {
            title: 'Quận 12',
            id: 11
        },
        {
            title: 'Q. Bình Tân',
            id: 12
        },
        {
            title: 'Q. Bình Thành',
            id: 13
        },
        {
            title: 'Q. Gò Vấp',
            id: 14
        },
        {
            title: 'Q. Phú Nhuận',
            id: 15
        },
        {
            title: 'Q. Tân Bình',
            id: 16
        },
        {
            title: 'Q. Tân Phú',
            id: 17
        },
        {
            title: 'Q. Thủ Đức',
            id: 18
        },
        {
            title: 'Huyện Bình Chánh',
            id: 19
        },
        {
            title: 'Huyện Cần Giờ',
            id: 20
        },
        {
            title: 'Huyện Củ Chi',
            id: 21
        },
        {
            title: 'Huyện Hóc Môn',
            id: 22
        },
        {
            title: 'Huyện Nhà Bè',
            id: 23
        },
        {
            title: 'Quận Khác',
            id: 24
        }
    ]

    //Load data
    useEffect(() => {
        fetchData(res => setO2(res));
    }, [])

    //Fetch data
    const fetchData = async (callback) => {
        let hasResolved = false;
        const fallback = districts.map((d, i) => defaultO2Data[i] || []);

        const timeout = setTimeout(() => {
            if (!hasResolved) {
                hasResolved = true;
                callback(fallback);
            }
        }, 1500);

        try {
            Promise.all(districts.map((data, i) => {
                return new Promise((res) => {
                    const fallbackDistrict = defaultO2Data[i] || [];
                    try {
                        Database.ref(`o2/${i}`).once('value', snapshot => {
                            const arr = snapToArray(snapshot);
                            res(arr && arr.length > 0 ? arr : fallbackDistrict);
                        }, () => res(fallbackDistrict));
                    } catch (e) {
                        res(fallbackDistrict);
                    }
                });
            })).then((res) => {
                clearTimeout(timeout);
                if (!hasResolved) {
                    hasResolved = true;
                    callback(res);
                }
            }).catch(() => {
                clearTimeout(timeout);
                if (!hasResolved) {
                    hasResolved = true;
                    callback(fallback);
                }
            });
        } catch (e) {
            clearTimeout(timeout);
            if (!hasResolved) {
                hasResolved = true;
                callback(fallback);
            }
        }
    }

    return {
        districts,
        o2,
        setRedirectAddNew,
        redirectAddNew
    }
}