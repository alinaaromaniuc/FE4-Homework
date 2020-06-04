<?php
session_start();

include 'config.php';
$update=false;


if(isset($_POST['add'])){
    $name = $_POST['name'];
    $description = $_POST['description'];
    $price = $_POST['price'];

    $query = "INSERT INTO records(Product_Name,Product_Description,Product_Price) VALUES ('$name','$description','$price')";

$result = mysqli_query($conn, $query);
if($result)
         {
             header("location:index.php");
         }
         else
         {
             echo '  Please Check Your Query ';
         } 
header('location:index.php');
$_SESSION['response']="Successfully Inserted to the database!";
$_SESSION['res_type']="success";
}

if(isset($_GET['delete'])){
    $id=$_GET['delete'];

    $query = " DELETE FROM records WHERE id = '".$id."'";
    $result = mysqli_query($conn,$query);

    if($result){
        header("location:index.php");
    }
    else{
        echo ' Please Check Your Query ';
    }
    header('location:index.php');
$_SESSION['response']="Successfully Deleted!";
$_SESSION['res_type']="danger";
}

if(isset($_GET['edit'])){
    $id=$_GET['edit'];
    $query = " SELECT * FROM records WHERE id='".$id."'";
    $result = mysqli_query($conn,$query);
    while($row=mysqli_fetch_assoc($result)){
    $id =$row['id'];
    $name=$row['Product_Name'];
    $description=$row['Product_Description'];
    $price =$row['Product_Price']; 
}

   $query = " UPDATE records  SET Product_Name='".$name."' ,Product_Description='".$description."',Product_Price='".$price."', WHERE id='".$id."'";
   $result = mysqli_query($conn, $query);
$update=true;
}
if($result)
        {
            header("location:index.php");
        }
if(isset($_POST['update'])){
    $id =$_POST['id'];
    $name=$_POST['name'];
    $description=$_POST['description'];
    $price =$_POST['price'];
    $query = " UPDATE records  SET Product_Name='".$name."' ,Product_Description='".$description."',Product_Price='".$price."', WHERE id='".$id."'";
    $result = mysqli_query($conn, $query);
    if($result)
    {
        header("location:view.php");
    }
    else
    {
        echo ' Please Check Your Query ';
    }
    $_SESSION['response']="Updated successfully!"; 
    $_SESSION['res-type']="primary";
    header('location:index.php');
}

?>