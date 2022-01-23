interface Dict<T> {
    [index: string]: T
}

export interface IJson2HtmlTableOptions {
    // tslint:disable-next-line:ban-types
    headers: Dict<Object>
    // tslint:disable-next-line:ban-types
    data: Dict<Object>[]
}

export const json2HtmlTable = (options: IJson2HtmlTableOptions) => {
    const tableData = options.data
    const headers = options.headers

    let htmlTable = `
        <!DOCTYPE html>
        <html>
        <head>
        <style>
        #table {
          font-family: Arial, Helvetica, sans-serif;
          border-collapse: collapse;
          width: 100%;
        }
        #table td, #table th {
          border: 1px solid #ddd;
          padding: 8px;
        }
        #table tr:nth-child(even){background-color: #f2f2f2;}
        #table tr:hover {background-color: #ddd;}
        #table th {
          padding-top: 12px;
          padding-bottom: 12px;
          text-align: left;
          background-color: #333;
          color: white;
        }
        </style>
        </head>
        <body>
    `
    const cellArray: string[][] = []
    let cellRow: string[] = []
    cellArray.push(cellRow)
    Object.keys(headers).forEach((key: string) => {
        cellRow.push('<th>' + headers[key] + '</th>')
    })
    // tslint:disable-next-line:ban-types
    tableData.forEach((json: Dict<Object>) => {
        cellRow = []
        cellArray.push(cellRow)
        Object.keys(headers).forEach((key: string) => {
            let value = json[key]
            if (value === undefined) {
                value = ''
            } else {
                value = JSON.stringify(value).replace(/"/g, '')
            }
            cellRow.push('<td>' + value + '</td>')
        })
    })

    const newLine = '\n'
    const indent = '  '
    if (tableData.length) {
        htmlTable += '<table id="table">'
        for (const tableRow of cellArray) {
            htmlTable += newLine
            htmlTable += indent
            htmlTable += '<tr>'
            for (const cell of tableRow) {
                htmlTable += newLine
                htmlTable += indent
                htmlTable += indent
                htmlTable += cell
            }
            htmlTable += newLine
            htmlTable += indent
            htmlTable += '</tr>'
        }
        htmlTable += newLine
        htmlTable += `
            </table>
            </body>
            </html>
        `
    }
    return htmlTable
}
