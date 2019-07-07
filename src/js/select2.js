
// This list should be built programmatically as users continue to search
let selectOpts = [
    {id:'-1', text: 'placeholder_text'},
    {id: 1, text: 'Nairobi'},
    {id: 2, text: 'Kigali'},
    {id: 3, text: 'Adis Ababa'},
    {id: 4, text: 'Abuja'},
    {id: 5, text: 'Accra'},
    {id: 6, text: 'Kampala'},
    {id: 7, text: 'Tunis'},
    {id: 8, text: 'Blantyre'},
    {id: 9, text: 'Monrovia'},
    {id: 10, text: 'Daresalaam'}
];

$('#popular').select2({
    placeholder: {
        id: '-1',
        text: 'Search weather by name of place'
    },
    data: selectOpts
});