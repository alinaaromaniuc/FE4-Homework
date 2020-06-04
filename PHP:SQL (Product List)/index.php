<?php
include 'action.php';

?>


<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Final APP</title>
    <!-- Latest compiled and minified CSS -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css">

<!-- jQuery library -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

<!-- Popper JS -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>

<!-- Latest compiled JavaScript -->
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js"></script>
</head>

<body>
<div class="container-fluid">
  <hr>  
  <?php if(isset($_SESSION['response'])){  ?>
  <div class="alert alert-<?= $_SESSION['res_type'];?> alert-dismissible text-center">
  <button type="button" class="close" data-dismiss="alert">&times;
  </button>
  <?= $_SESSION['response']; ?>
</div>
  <?php }unset($_SESSION['response']); ?>
<hr>
<div class="row mt-2">
<div class="col-md-4">
<h3 class="text-center text-info"> Add product </h3>
<form action="action.php" method="post" enctype="multipart/form-data"> 
<input type="hidden" name="id" value="<?= $id; ?>">
    <div class="form-group">
        <input type="text" name="name" value="<?=  $name; ?>" class="form-control" placeholder = "Enter Product Name" required>
    </div>
    <div class="form-group">
        <input type="text" name="description" value="<?= $description; ?>"class="form-control" placeholder = "Enter Product Description" required>
    </div>
    <div class="form-group">
        <input type="number" name="price" value="<?=  $price; ?>" class="form-control" placeholder = "Enter Product Price" required>
    </div>
    <div class="form-group">
    <?php if($update==true){ ?>
      <input type="submit" name="update" class="btn btn-success btn-block" value="Update Product">
    <?php } else {?>
        <input type="submit" name="add" class="btn btn-primary btn-block" value="Add Product">
    <?php } ?>
      </div>
</form>
</div>
<div class="col-md-8">
<?php
   require_once("config.php");
   $query = " SELECT * FROM records ";
   $result = mysqli_query($conn,$query);
?>
<h3 class="text-center text-info"> Products in Database </h3>
<table class="table table-hover">
    <thead>
      <tr>
        <th>#</th>
        <th>Product</th>
        <th>Description</th>
        <th>Price</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
        <?php while($row=$result->fetch_assoc()) { ?>
      <tr>
        <td><?=$row['id'];?></td>
        <td><?=$row['Product_Name'];?></td>
        <td><?=$row['Product_Description'];?></td>
        <td><?=$row['Product_Price'];?></td>
        <td>
            <a href="action.php?delete=<?= $row['id']; ?>" class="badge badge-danger p-2" onclick="return confirm('Do you want to delete this record?');">Delete</a>
            <a href="index.php?edit=<?= $row['id'];?>" class="badge badge-success p-2">Edite</a>
        </td>
      </tr>
        <?php }; ?>
    </tbody>
  </table>
</div>

</div>

</div>
</body>

</html>