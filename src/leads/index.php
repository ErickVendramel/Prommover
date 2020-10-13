<?php
// Initialize the session
session_start();

// Check if the user is logged in, if not then redirect him to login page
if(!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true){
    header("location: login.php");
    exit;
}

require_once "config.php";

$query = "SELECT * from leads";

if (!$result = mysqli_query($link, $query)) {

    echo "Erro ao obter os leads";
    mysqli_free_result($result);

} 

mysqli_close($link);

?>
    
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
		<title>Welcome</title>
		
    <!-- Bootstrap core CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdn.datatables.net/1.10.20/css/dataTables.bootstrap4.min.css">
    <link rel="stylesheet" href="https://cdn.datatables.net/buttons/1.6.1/css/buttons.bootstrap4.min.css">
		
		<style>
			body {
				font-size: 12px;
			}
		</style>
</head>
<body>

    <div class="container-fluid py-4">
        <div class="row">
            <div class="col-xl-12">
                <table id="myTable" class="table table-bordered">
                    <thead class="table-info">
                        <tr>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>DDD</th>
												<th>Telefone</th>
												<th>Mensagem</th>
                        <th>Data de cadastro</th>
                        <th>URL</th>
                        </tr>
                    </thead>
                    <tbody id="myTableBody">
												<?php 
												while ($row = mysqli_fetch_assoc($result)) {
													echo "<tr>";
													echo "<td>{$row['name']}</td>";
													echo "<td>{$row['email']}</td>";
													echo "<td>{$row['ddd']}</td>";
													echo "<td>{$row['phone']}</td>";
													echo "<td>{$row['message']}</td>";
													echo "<td>{$row['timestamp']}</td>";
													echo "<td>{$row['url']}</td>";
													echo "</tr>";
												}
												?> 
                    </tbody>
                </table>
            </div>
        </div>
    </div>

<script
src="https://code.jquery.com/jquery-3.4.1.min.js"
integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo="
crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
<script src="https://cdn.datatables.net/1.10.20/js/jquery.dataTables.min.js"></script>
<script src="https://cdn.datatables.net/1.10.20/js/dataTables.bootstrap4.min.js"></script>
<script src="https://cdn.datatables.net/plug-ins/1.10.20/dataRender/ellipsis.js"></script>
<script src="https://cdn.datatables.net/buttons/1.6.1/js/dataTables.buttons.min.js"></script>
<script src="https://cdn.datatables.net/buttons/1.6.1/js/buttons.flash.min.js"></script>
<script src="https://cdn.datatables.net/buttons/1.6.1/js/buttons.bootstrap4.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.1.3/jszip.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.53/pdfmake.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.53/vfs_fonts.js"></script>
<script src="https://cdn.datatables.net/buttons/1.6.1/js/buttons.html5.min.js"></script>
<script src="https://cdn.datatables.net/buttons/1.6.1/js/buttons.print.min.js"></script>
<script>

	let today = new Date();

    $('#myTable').DataTable({
        "language": {
            "url": "https://cdn.datatables.net/plug-ins/1.10.20/i18n/Portuguese-Brasil.json"
        },
        columnDefs: [ {
            targets: 4,
            render: $.fn.dataTable.render.ellipsis( 30 )
        },
        {
            targets: 6,
            render: $.fn.dataTable.render.ellipsis( 30 )
        } ],
        dom: 'lBfrtip',
        buttons: [
            {
            extend: 'csv',
            title: `inscreveu.com-${today.getDate().toString().padStart(2, "0")}-${parseInt(today.getMonth().toString().padStart(2, "0")) + 1}-${today.getFullYear()}`,
            exportOptions: { orthogonal: 'export' }
            },
            {
            extend: 'excel',
            title: `inscreveu.com-${today.getDate().toString().padStart(2, "0")}-${parseInt(today.getMonth().toString().padStart(2, "0")) + 1}-${today.getFullYear()}`,
            exportOptions: { orthogonal: 'export' }
            }
        ]
    });

</script>
</body>
</html>